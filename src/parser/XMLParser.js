export function parseXML(xmlString) {
  const cleaned = xmlString.trim()

  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(cleaned, 'text/xml')

  const errorNode = xmlDoc.getElementsByTagName('parsererror')[0]
  if (errorNode) {
    throw new Error('XML Parsing Error: ' + errorNode.textContent)
  }

  return xmlDoc.documentElement
}