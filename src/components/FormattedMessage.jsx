import React from 'react';
import TableRenderer from './TableRenderer';

const FormattedMessage = ({ content }) => {
  if (!content || typeof content !== 'string') {
    return <span>{content}</span>;
  }

  // Check if content contains a table
  if (content.includes('|') && content.includes('---')) {
    return <TableRenderer content={content} />;
  }

  // Helper: render inline **bold** segments
  const renderInline = (text) => {
    if (text == null) return text;
    if (typeof text !== 'string') return text;
    const out = [];
    let last = 0;
    const regex = /\*\*(.+?)\*\*/g;
    let m;
    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) out.push(text.slice(last, m.index));
      out.push(<strong key={`b-${out.length}`} style={{ color: '#1F3A9E' }}>{m[1]}</strong>);
      last = regex.lastIndex;
    }
    if (last < text.length) out.push(text.slice(last));
    return out.length ? out : text;
  };

  // Split by lines and process each line
  const lines = content.split('\n');
  
  return (
    <div style={{ lineHeight: '1.6', fontSize: '15px' }}>
      {lines.map((line, index) => {
        const trimmedLine = line.trim();
        
        // Skip empty lines but preserve spacing
        if (!trimmedLine) {
          return <div key={index} style={{ height: '8px' }} />;
        }
        
        // Check if line is a header (wrapped in **)
        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
          const headerText = trimmedLine.slice(2, -2);
          return (
            <div key={index} style={{ 
              fontWeight: '600', 
              fontSize: '17px', 
              color: '#1F3A9E', 
              marginTop: index > 0 ? '16px' : '0',
              marginBottom: '12px',
              borderBottom: '2px solid #e8f1ff',
              paddingBottom: '6px'
            }}>
              {headerText}
            </div>
          );
        }
        
        // Check if line is a bullet point (supports '• ', '* ', '- ')
        if (trimmedLine.startsWith('• ') || /^[-*]\s+/.test(trimmedLine)) {
          const bulletText = trimmedLine.startsWith('• ')
            ? trimmedLine.slice(2)
            : trimmedLine.replace(/^[-*]\s+/, '');
          return (
            <div key={index} style={{ 
              marginLeft: '20px', 
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <span style={{ 
                color: '#FF8C00', 
                fontWeight: 'bold',
                marginTop: '2px',
                fontSize: '16px',
                minWidth: '16px'
              }}>•</span>
              <span style={{ flex: 1, lineHeight: '1.5' }}>{renderInline(bulletText)}</span>
            </div>
          );
        }
        
        // Check if line is numbered list
        if (/^\d+\.\s/.test(trimmedLine)) {
          const match = trimmedLine.match(/^(\d+\.\s*)(.+)/);
          const number = match ? match[1] : '';
          const content = match ? match[2] : trimmedLine;
          
          // If the entire content is wrapped in **bold**, treat it as a header (category title)
          if (/^\*\*(.+)\*\*$/.test(content)) {
            const headerText = content.replace(/^\*\*(.+)\*\$/, '**$1**');
            return (
              <div key={index} style={{ 
                fontWeight: '600', 
                fontSize: '17px', 
                color: '#1F3A9E', 
                marginTop: index > 0 ? '16px' : '0',
                marginBottom: '10px',
                borderBottom: '2px solid #e8f1ff',
                paddingBottom: '6px'
              }}>
                {headerText.slice(2, -2)}
              </div>
            );
          }

          // Parse tokens separated by ' - ' and treat the LAST employment-type token specially.
          // This lets us merge compound names like "Cardiac - Anesthesiology" -> "Cardiac Anesthesiology".
          let formattedContent = content;
          if (content.includes(' - ')) {
            const tokens = content.split(' - ').map(t => t.trim()).filter(Boolean);
            if (tokens.length >= 2) {
              // Detect employment token in the last position
              const last = tokens[tokens.length - 1];
              const isEmployment = /(full\s*time|part\s*time|visiting|locum|consultant)/i.test(last);
              const isNoCategory = /no\s*category\s*mentioned/i.test(last);

              if (isEmployment) {
                const employmentType = last;
                const nameJoined = tokens.slice(0, -1).join(' '); // merge all prior tokens into the name
                formattedContent = (
                  <span>
                    <strong style={{ color: '#1F3A9E' }}>{nameJoined}</strong>
                    <span style={{ color: '#666', margin: '0 8px' }}>-</span>
                    <span style={{ 
                      color: employmentType.toLowerCase().includes('full time') ? '#28a745' :
                             employmentType.toLowerCase().includes('part time') ? '#856404' : '#0c5460',
                      marginLeft: '0',
                      fontSize: '13px',
                      fontWeight: '600',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: employmentType.toLowerCase().includes('full time') ? '#d4edda' :
                                      employmentType.toLowerCase().includes('part time') ? '#fff3cd' : '#d1ecf1'
                    }}>
                      {employmentType}
                    </span>
                  </span>
                );
              } else if (isNoCategory) {
                const nameJoined = tokens.slice(0, -1).join(' ');
                formattedContent = (
                  <span>
                    <strong style={{ color: '#1F3A9E' }}>{nameJoined}</strong>
                    <span style={{ color: '#666', marginLeft: '8px' }}>-</span>
                    <span style={{ color: '#555', marginLeft: '8px' }}>{last}</span>
                  </span>
                );
              } else {
                // Default: keep first part as name and show remainder as plain text
                const name = tokens[0];
                const rest = tokens.slice(1).join(' - ');
                formattedContent = (
                  <span>
                    <strong style={{ color: '#1F3A9E' }}>{name}</strong>
                    <span style={{ color: '#666', marginLeft: '8px' }}>-</span>
                    <span style={{ marginLeft: '8px' }}>{rest}</span>
                  </span>
                );
              }
            }
          }
          // Apply inline bold if still plain text
          if (typeof formattedContent === 'string') {
            formattedContent = renderInline(formattedContent);
          }
          
          return (
            <div key={index} style={{ 
              marginLeft: '12px', 
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '6px 0'
            }}>
              <span style={{ 
                color: '#FF8C00', 
                fontWeight: '700',
                fontSize: '15px',
                minWidth: '24px',
                textAlign: 'right'
              }}>{number.trim()}</span>
              <span style={{ 
                flex: 1, 
                lineHeight: '1.6',
                fontSize: '15px'
              }}>
                {formattedContent}
              </span>
            </div>
          );
        }
        
        // Regular line
        return (
          <div key={index} style={{ 
            marginBottom: '8px',
            lineHeight: '1.5'
          }}>
            {renderInline(trimmedLine)}
          </div>
        );
      })}
    </div>
  );
};

export default FormattedMessage;