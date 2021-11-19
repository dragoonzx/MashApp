export function getIPFSUrl(ipfsHash: string) {
  const url = `https://ipfs.io/ipfs/${ipfsHash}`;
  return url
}

export function getIPFSMashup(ipfsHash: string) {
  const url = `https://ipfs.moralis.io:2053/ipfs/${ipfsHash}`
  return url
}