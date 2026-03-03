export function parseXML(xmlString) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml')
  const rootNode = xmlDoc.documentElement
  return rootNode
}