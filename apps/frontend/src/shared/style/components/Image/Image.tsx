import styled from 'styled-components'

type ImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  borderRadius?: number
}

const StyledImage = styled.img.withConfig({
  shouldForwardProp: (prop) => !['width', 'height', 'objectFit', 'borderRadius'].includes(prop),
})<Omit<ImageProps, 'src' | 'alt'>>`
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  object-fit: ${({ objectFit = 'cover' }) => objectFit};
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius}px` : '0')};
`

export function Image({ src, alt, ...props }: ImageProps) {
  return <StyledImage src={src} alt={alt} {...props} />
}
