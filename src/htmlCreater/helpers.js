const openingTag = (tag, attrs = '') => {
  return '<' + tag + ' ' + attrs + '>';
};

const closingTag = (tag) => {
  return '</' + tag + '>';
};

const stringifyStyleProperty = ([property, value]) => {
  return property + ':' + value + ';';
};

const stringifyStyle = (properties) => {
  return Object.entries(properties).map(stringifyStyleProperty).join('');
};

const stringifyAttribute = ([key, value]) => {
  const newValue = key === 'style' ? stringifyStyle(value) : value;
  return key + '=' + '"' + newValue + '"';
};

const stringifyAttributes = (attrs) => {
  return Object.entries(attrs).map(stringifyAttribute).join(' ');
};

const isSelfClosing = (tag) => {
  const selfClosingTags = ['img', 'link', 'hr', 'br'];
  return selfClosingTags.includes(tag);
};

const selfClosingTagHtml = (tag, attrs) => {
  return '<' + tag + ' ' + stringifyAttributes(attrs) + ' />';
};

exports.openingTag = openingTag;
exports.closingTag = closingTag;
exports.stringifyStyle = stringifyStyle;
exports.stringifyAttributes = stringifyAttributes;
exports.isSelfClosing = isSelfClosing;
exports.selfClosingTagHtml = selfClosingTagHtml;
