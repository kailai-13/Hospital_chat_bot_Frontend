import React from 'react';

const TableRenderer = ({ content }) => {
  const lines = content.split('\n');

  // Split content into blocks of tables and non-table text
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const isTableLine = line.trim().startsWith('|');
    if (!isTableLine) {
      // accumulate non-table text until next table
      const textBuf = [];
      while (i < lines.length && !lines[i].trim().startsWith('|')) {
        if (lines[i].trim()) textBuf.push(lines[i]);
        i++;
      }
      if (textBuf.length) blocks.push({ type: 'text', lines: textBuf });
    } else {
      // accumulate table lines until a non-table line
      const tableBuf = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        // ignore stray lines like "||||" (no cell content)
        const raw = lines[i].trim();
        const cells = raw.split('|').map(c => c.trim()).filter(Boolean);
        if (cells.length > 0) tableBuf.push(lines[i]);
        i++;
      }
      if (tableBuf.length) blocks.push({ type: 'table', lines: tableBuf });
    }
  }

  const renderTable = (tableLines, key) => {
    if (!tableLines || tableLines.length < 2) return null;

    // Find header and separator; if missing, synthesize a header with generic columns
    let headerIdx = 0;
    let sepIdx = 1;
    // If no explicit separator, try to detect by presence of --- or create one
    if (!tableLines[1] || !tableLines[1].includes('---')) {
      // infer columns from first row
      const inferredCols = tableLines[0].split('|').map(c => c.trim()).filter(Boolean).length || 4;
      const sep = Array(inferredCols).fill('---').join(' | ');
      tableLines = [tableLines[0], `| ${sep} |`, ...tableLines.slice(1)];
    }

    const headerLine = tableLines[headerIdx];
    const dataLines = tableLines.slice(2);

    const headers = headerLine.split('|').map(h => h.trim()).filter(Boolean);
    // Clean headers (fallback to Column N for blanks)
    const headerCount = headers.length || 4;
    const cleanHeaders = headers.length ? headers : Array.from({ length: headerCount }, (_, i) => `Column ${i + 1}`);

    const rows = dataLines
      .map(line => line.split('|').map(c => c.trim()))
      .map(cells => cells.filter(Boolean))
      .filter(row => row.length > 0);

    // Normalize row lengths to headers length
    const normalizedRows = rows.map(row => {
      if (row.length === cleanHeaders.length) return row;
      if (row.length < cleanHeaders.length) {
        return [...row, ...Array(cleanHeaders.length - row.length).fill('')];
      }
      return row.slice(0, cleanHeaders.length);
    });

    return (
      <div key={key} style={{ 
        margin: '16px 0',
        border: '1px solid #e8f1ff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(135deg, #2E4AC7 0%, #1F3A9E 100%)', color: 'white' }}>
              {cleanHeaders.map((header, index) => (
                <th key={index} style={{
                  padding: '12px 8px',
                  textAlign: 'left',
                  fontWeight: '600',
                  fontSize: '13px',
                  borderRight: index < cleanHeaders.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none'
                }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {normalizedRows.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ background: rowIndex % 2 === 0 ? '#fafcff' : 'white', borderBottom: '1px solid #f0f4f8' }}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={{ padding: '10px 8px', borderRight: cellIndex < row.length - 1 ? '1px solid #f0f4f8' : 'none', color: '#2d3748', lineHeight: '1.4' }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render blocks
  return (
    <div style={{ fontSize: '15px', lineHeight: '1.6' }}>
      {blocks.map((block, idx) => {
        if (block.type === 'text') {
          // You'll need to import FormattedMessage here or pass it as prop
          // For now, we'll render plain text
          return <div key={`text-${idx}`}>{block.lines.join('\n')}</div>;
        }
        if (block.type === 'table') {
          return renderTable(block.lines, `table-${idx}`);
        }
        return null;
      })}
    </div>
  );
};

export default TableRenderer;