const {
  openingTag,
  closingTag,
  stringifyAttributes,
  isSelfClosing,
  selfClosingTagHtml
} = require('./helpers.js');

const isArray = Array.isArray;

const html = ([tag, attrs, contents]) => {
  if (isSelfClosing(tag)) {
    return selfClosingTagHtml(tag, attrs);
  }

  const newContent = contents.map(content => isArray(content) ? html(content) : content).join(' ');

  return openingTag(tag, stringifyAttributes(attrs)) + newContent + closingTag(tag);
};

exports.html = html;
