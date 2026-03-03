import { createView } from './ViewRegistry.js'

export function inflateXMLString(xmlString) {

  const cleaned = xmlString.replace(/android:/g, '')

  const parser = new DOMParser()
  const doc = parser.parseFromString(cleaned, 'application/xml')

  const rootNode = doc.documentElement
  return inflateNode(rootNode)
}

function inflateNode(xmlNode) {
  const props = {}

  for (let attr of xmlNode.attributes) {
    props[attr.name] = attr.value
  }

  const view = createView(xmlNode.tagName, props)

  Array.from(xmlNode.children).forEach(childNode => {
    const childView = inflateNode(childNode)
    view.addView(childView)
  })

  return view
}