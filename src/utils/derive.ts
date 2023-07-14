import request from '../axios/index'

async function derive({ url, params, data, method, filename }) {
  const res: any = await request({
    url: url,
    method,
    params,
    data,
    responseType: 'blob'
  })
  const blob = new Blob([res], {
    type: 'application/octet-stream'
  })
  let fileName = filename + '.xls'
  if (filename.split('.').length > 1) {
    fileName = filename
  }
  const linkNode = document.createElement('a')

  linkNode.download = fileName
  linkNode.style.display = 'none'
  linkNode.href = URL.createObjectURL(blob)
  document.body.appendChild(linkNode)
  linkNode.click()

  URL.revokeObjectURL(linkNode.href)
  document.body.removeChild(linkNode)
}
export { derive }
