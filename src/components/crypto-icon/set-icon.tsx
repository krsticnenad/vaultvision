export const CryptoIcon = (type: string, size: string = 'small') => {
    return <img src={`/src/assets/icons/${size}/${type.toLowerCase()}-icon.svg`} alt='Crypto Icon' />
}