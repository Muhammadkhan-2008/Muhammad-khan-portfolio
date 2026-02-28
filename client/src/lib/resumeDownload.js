const textEncoder = new TextEncoder();

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapePdf(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function toUInt16LE(value) {
  const bytes = new Uint8Array(2);
  bytes[0] = value & 0xff;
  bytes[1] = (value >> 8) & 0xff;
  return bytes;
}

function toUInt32LE(value) {
  const bytes = new Uint8Array(4);
  bytes[0] = value & 0xff;
  bytes[1] = (value >> 8) & 0xff;
  bytes[2] = (value >> 16) & 0xff;
  bytes[3] = (value >> 24) & 0xff;
  return bytes;
}

function concatBytes(chunks) {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;

  chunks.forEach((chunk) => {
    output.set(chunk, offset);
    offset += chunk.length;
  });

  return output;
}

function crc32(bytes) {
  let crc = 0xffffffff;

  for (let index = 0; index < bytes.length; index += 1) {
    crc ^= bytes[index];
    for (let bit = 0; bit < 8; bit += 1) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function getDosTimeDate() {
  const now = new Date();
  const seconds = Math.floor(now.getSeconds() / 2);
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = Math.max(now.getFullYear(), 1980) - 1980;

  const dosTime = (hours << 11) | (minutes << 5) | seconds;
  const dosDate = (year << 9) | (month << 5) | day;

  return { dosTime, dosDate };
}

function createZip(files) {
  const localParts = [];
  const centralParts = [];
  const { dosTime, dosDate } = getDosTimeDate();
  let offset = 0;

  files.forEach((file) => {
    const fileNameBytes = textEncoder.encode(file.name);
    const fileData = typeof file.content === "string" ? textEncoder.encode(file.content) : file.content;
    const checksum = crc32(fileData);

    const localHeader = concatBytes([
      toUInt32LE(0x04034b50),
      toUInt16LE(20),
      toUInt16LE(0),
      toUInt16LE(0),
      toUInt16LE(dosTime),
      toUInt16LE(dosDate),
      toUInt32LE(checksum),
      toUInt32LE(fileData.length),
      toUInt32LE(fileData.length),
      toUInt16LE(fileNameBytes.length),
      toUInt16LE(0),
      fileNameBytes,
    ]);

    localParts.push(localHeader, fileData);

    const centralHeader = concatBytes([
      toUInt32LE(0x02014b50),
      toUInt16LE(20),
      toUInt16LE(20),
      toUInt16LE(0),
      toUInt16LE(0),
      toUInt16LE(dosTime),
      toUInt16LE(dosDate),
      toUInt32LE(checksum),
      toUInt32LE(fileData.length),
      toUInt32LE(fileData.length),
      toUInt16LE(fileNameBytes.length),
      toUInt16LE(0),
      toUInt16LE(0),
      toUInt16LE(0),
      toUInt16LE(0),
      toUInt32LE(0),
      toUInt32LE(offset),
      fileNameBytes,
    ]);

    centralParts.push(centralHeader);
    offset += localHeader.length + fileData.length;
  });

  const centralDirectory = concatBytes(centralParts);
  const localData = concatBytes(localParts);

  const endRecord = concatBytes([
    toUInt32LE(0x06054b50),
    toUInt16LE(0),
    toUInt16LE(0),
    toUInt16LE(files.length),
    toUInt16LE(files.length),
    toUInt32LE(centralDirectory.length),
    toUInt32LE(localData.length),
    toUInt16LE(0),
  ]);

  return concatBytes([localData, centralDirectory, endRecord]);
}

function wrapText(text, lineLength = 90) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > lineLength) {
      if (current) {
        lines.push(current);
      }
      current = word;
    } else {
      current = candidate;
    }
  });

  if (current) {
    lines.push(current);
  }

  return lines;
}

function buildWordParagraph(text, options = {}) {
  const {
    bold = false,
    size = 22,
    color = "0f172a",
    align = "left",
    spacingBefore = 0,
    spacingAfter = 90,
    allCaps = false,
    shading = null,
    borderBottom = false,
    indentLeft = 0,
  } = options;

  const jc = align !== "left" ? `<w:jc w:val="${align}"/>` : "";
  const spacing = `<w:spacing w:before="${spacingBefore}" w:after="${spacingAfter}"/>`;
  const indent = indentLeft ? `<w:ind w:left="${indentLeft}"/>` : "";
  const shd = shading ? `<w:shd w:val="clear" w:color="auto" w:fill="${shading}"/>` : "";
  const bottomBorder = borderBottom
    ? "<w:pBdr><w:bottom w:val=\"single\" w:sz=\"8\" w:space=\"1\" w:color=\"dbe2ea\"/></w:pBdr>"
    : "";
  const runBold = bold ? "<w:b/><w:bCs/>" : "";
  const runCaps = allCaps ? "<w:caps/>" : "";

  return `<w:p>
    <w:pPr>${jc}${spacing}${indent}${shd}${bottomBorder}</w:pPr>
    <w:r>
      <w:rPr>${runBold}${runCaps}<w:color w:val="${color}"/><w:sz w:val="${size}"/><w:szCs w:val="${size}"/></w:rPr>
      <w:t xml:space="preserve">${escapeXml(text)}</w:t>
    </w:r>
  </w:p>`;
}

function buildDocxXml(resumeData) {
  const sections = [];
  const add = (text, options) => sections.push(buildWordParagraph(text, options));
  const addBlank = (after = 40) => sections.push(buildWordParagraph(" ", { size: 2, color: "ffffff", spacingAfter: after }));

  add(resumeData.name, { bold: true, size: 54, color: "0f172a", spacingAfter: 40 });
  add(resumeData.role, { bold: true, size: 24, color: "334155", spacingAfter: 55 });
  add(`${resumeData.phone}   |   ${resumeData.email}`, {
    size: 20,
    color: "475569",
    spacingAfter: 40,
  });
  add(`GitHub: ${resumeData.githubUrl}`, { size: 18, color: "1d4ed8", spacingAfter: 25 });
  add(`LinkedIn: ${resumeData.linkedinUrl}`, { size: 18, color: "1d4ed8", spacingAfter: 180, borderBottom: true });

  add("Professional Summary", {
    bold: true,
    allCaps: true,
    size: 20,
    color: "ffffff",
    shading: "0f172a",
    spacingBefore: 40,
    spacingAfter: 70,
  });
  wrapText(resumeData.summary, 95).forEach((line, index, arr) =>
    add(line, { size: 21, color: "0f172a", spacingAfter: index === arr.length - 1 ? 130 : 50 }),
  );

  add("Technologies", {
    bold: true,
    allCaps: true,
    size: 20,
    color: "ffffff",
    shading: "1e293b",
    spacingAfter: 70,
  });
  wrapText(resumeData.technologies.join(", "), 95).forEach((line, index, arr) =>
    add(line, { size: 21, color: "0f172a", spacingAfter: index === arr.length - 1 ? 130 : 50 }),
  );

  add("Experience", {
    bold: true,
    allCaps: true,
    size: 20,
    color: "ffffff",
    shading: "1e293b",
    spacingAfter: 75,
  });

  resumeData.experience.forEach((item, idx) => {
    add(`${item.title} - ${item.company}`, { bold: true, size: 22, color: "111827", spacingAfter: 35 });
    add(item.period, { size: 18, color: "64748b", spacingAfter: 45 });
    item.points.forEach((point) => {
      wrapText(`• ${point}`, 90).forEach((line) =>
        add(line, { size: 20, color: "0f172a", indentLeft: 360, spacingAfter: 30 }),
      );
    });
    if (idx !== resumeData.experience.length - 1) {
      addBlank(65);
    }
  });

  add("Education", {
    bold: true,
    allCaps: true,
    size: 20,
    color: "ffffff",
    shading: "1e293b",
    spacingBefore: 70,
    spacingAfter: 75,
  });

  resumeData.education.forEach((item) => {
    add(item.degree, { bold: true, size: 21, color: "111827", spacingAfter: 30 });
    add(item.institute, { size: 20, color: "0f172a", spacingAfter: 25 });
    add(item.timeline, { size: 18, color: "64748b", spacingAfter: 70 });
  });

  add("Project Highlights", {
    bold: true,
    allCaps: true,
    size: 20,
    color: "ffffff",
    shading: "1e293b",
    spacingAfter: 70,
  });

  resumeData.highlights.forEach((item, index) => {
    add(`• ${item}`, { size: 20, color: "0f172a", indentLeft: 320, spacingAfter: index === resumeData.highlights.length - 1 ? 40 : 35 });
  });

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    ${sections.join("")}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="980" w:right="980" w:bottom="980" w:left="980" w:header="708" w:footer="708" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`;
}

function buildStylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
    <w:rPr>
      <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/>
      <w:sz w:val="22"/>
      <w:szCs w:val="22"/>
      <w:color w:val="0f172a"/>
    </w:rPr>
  </w:style>
</w:styles>`;
}

function buildDocxBlob(resumeData) {
  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`;

  const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const documentRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

  const docXml = buildDocxXml(resumeData);
  const stylesXml = buildStylesXml();

  const zipBytes = createZip([
    { name: "[Content_Types].xml", content: contentTypesXml },
    { name: "_rels/.rels", content: rootRelsXml },
    { name: "word/document.xml", content: docXml },
    { name: "word/styles.xml", content: stylesXml },
    { name: "word/_rels/document.xml.rels", content: documentRelsXml },
  ]);

  return new Blob([zipBytes], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}

function buildPdfBlob(resumeData) {
  const pageWidth = 595;
  const pageHeight = 842;
  const marginX = 40;
  const contentWidth = pageWidth - marginX * 2;
  const pages = [];

  let commands = [];
  let y = 0;

  const newPage = (firstPage) => {
    if (commands.length) {
      pages.push(commands.join("\n"));
    }

    commands = [];
    const headerHeight = firstPage ? 120 : 72;
    const headerY = pageHeight - headerHeight;

    commands.push("0.06 0.10 0.18 rg");
    commands.push(`0 ${headerY} ${pageWidth} ${headerHeight} re f`);

    const text = (x, yPos, value, options = {}) => {
      const { font = "F1", size = 11, color = [0, 0, 0] } = options;
      commands.push("BT");
      commands.push(`/${font} ${size} Tf`);
      commands.push(`${color[0]} ${color[1]} ${color[2]} rg`);
      commands.push(`1 0 0 1 ${x} ${yPos} Tm`);
      commands.push(`(${escapePdf(value)}) Tj`);
      commands.push("ET");
    };

    if (firstPage) {
      text(marginX, pageHeight - 46, resumeData.name, { font: "F2", size: 25, color: [1, 1, 1] });
      text(marginX, pageHeight - 70, resumeData.role, { font: "F2", size: 12, color: [0.86, 0.91, 0.98] });
      text(marginX, pageHeight - 88, `${resumeData.phone} | ${resumeData.email}`, {
        font: "F1",
        size: 10,
        color: [0.81, 0.87, 0.95],
      });
      text(marginX, pageHeight - 104, "GitHub / LinkedIn links included in this resume", {
        font: "F1",
        size: 9,
        color: [0.75, 0.82, 0.92],
      });
      y = headerY - 26;
    } else {
      text(marginX, pageHeight - 46, `${resumeData.name} - Resume`, {
        font: "F2",
        size: 15,
        color: [0.88, 0.93, 1],
      });
      y = headerY - 22;
    }
  };

  const ensureSpace = (requiredHeight = 24) => {
    if (y - requiredHeight < 56) {
      newPage(false);
    }
  };

  const drawTextLine = (line, options = {}) => {
    const { font = "F1", size = 10.6, color = [0.06, 0.09, 0.14], lineHeight = 14, indent = 0 } = options;
    ensureSpace(lineHeight + 4);
    commands.push("BT");
    commands.push(`/${font} ${size} Tf`);
    commands.push(`${color[0]} ${color[1]} ${color[2]} rg`);
    commands.push(`1 0 0 1 ${marginX + indent} ${y} Tm`);
    commands.push(`(${escapePdf(line)}) Tj`);
    commands.push("ET");
    y -= lineHeight;
  };

  const drawSection = (title) => {
    ensureSpace(30);
    commands.push("0.09 0.13 0.22 rg");
    commands.push(`${marginX} ${y - 7} ${contentWidth} 20 re f`);
    drawTextLine(title.toUpperCase(), {
      font: "F2",
      size: 10.4,
      color: [1, 1, 1],
      lineHeight: 20,
      indent: 8,
    });
    y -= 4;
  };

  const drawWrapped = (text, options = {}) => {
    const { lineLength = 92, bullet = false, ...lineOptions } = options;
    const lines = wrapText(text, lineLength);
    lines.forEach((line, index) => {
      drawTextLine(index === 0 && bullet ? `• ${line}` : line, {
        ...lineOptions,
        indent: lineOptions.indent + (index > 0 && bullet ? 11 : 0),
      });
    });
  };

  newPage(true);

  drawSection("Professional Summary");
  drawWrapped(resumeData.summary, { lineLength: 95, lineHeight: 14.5, indent: 4 });
  y -= 6;

  drawSection("Technologies");
  drawWrapped(resumeData.technologies.join(", "), { lineLength: 95, lineHeight: 14.5, indent: 4 });
  y -= 6;

  drawSection("Experience");
  resumeData.experience.forEach((item) => {
    drawTextLine(`${item.title} - ${item.company}`, {
      font: "F2",
      size: 11.2,
      color: [0.07, 0.11, 0.19],
      lineHeight: 15,
      indent: 4,
    });
    drawTextLine(item.period, {
      font: "F1",
      size: 9.6,
      color: [0.36, 0.43, 0.53],
      lineHeight: 12,
      indent: 4,
    });
    item.points.forEach((point) => {
      drawWrapped(point, { bullet: true, lineLength: 87, lineHeight: 13.5, indent: 12 });
    });
    y -= 5;
  });

  drawSection("Education");
  resumeData.education.forEach((item) => {
    drawTextLine(item.degree, {
      font: "F2",
      size: 10.8,
      color: [0.07, 0.11, 0.19],
      lineHeight: 14.5,
      indent: 4,
    });
    drawTextLine(item.institute, {
      font: "F1",
      size: 10.2,
      color: [0.07, 0.11, 0.19],
      lineHeight: 13.5,
      indent: 4,
    });
    drawTextLine(item.timeline, {
      font: "F1",
      size: 9.4,
      color: [0.36, 0.43, 0.53],
      lineHeight: 13,
      indent: 4,
    });
    y -= 2;
  });

  drawSection("Project Highlights");
  resumeData.highlights.forEach((item) => {
    drawWrapped(item, { bullet: true, lineLength: 90, lineHeight: 13.6, indent: 12 });
  });

  if (commands.length) {
    pages.push(commands.join("\n"));
  }

  const objects = [null, null, null];
  const pageRefs = [];
  const fontRegularIndex = objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldIndex = objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  pages.forEach((stream) => {
    const contentObjectIndex = objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    const pageObjectIndex = objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularIndex} 0 R /F2 ${fontBoldIndex} 0 R >> >> /Contents ${contentObjectIndex} 0 R >>`,
    );
    pageRefs.push(`${pageObjectIndex} 0 R`);
  });

  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Kids [${pageRefs.join(" ")}] /Count ${pageRefs.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [];

  for (let objectIndex = 1; objectIndex < objects.length; objectIndex += 1) {
    offsets[objectIndex] = pdf.length;
    pdf += `${objectIndex} 0 obj\n${objects[objectIndex]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";

  for (let objectIndex = 1; objectIndex < objects.length; objectIndex += 1) {
    pdf += `${String(offsets[objectIndex]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

function triggerDownload(blob, filename, autoOpen = false) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  if (autoOpen) {
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 120);
  }

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, autoOpen ? 60000 : 12000);
}

export async function downloadResumeFile(resumeData, format, options = {}) {
  const autoOpen = Boolean(options.autoOpen);

  if (format === "pdf") {
    const pdfBlob = buildPdfBlob(resumeData);
    triggerDownload(pdfBlob, "Muhammad-Khan-Resume.pdf", autoOpen);
    return;
  }

  const docxBlob = buildDocxBlob(resumeData);
  triggerDownload(docxBlob, "Muhammad-Khan-Resume.docx", autoOpen);
}
