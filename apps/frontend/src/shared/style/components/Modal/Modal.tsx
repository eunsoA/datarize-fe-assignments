import styled from 'styled-components'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Text } from '@shared/style/components/Text/Text'
import { Image } from '@shared/style/components/Image/Image'
import { colors } from '@shared/style/token/colors'
import { Flex } from '@shared/style/components/Flex/Flex'
import cancelIcon from '/cancel.svg'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${({ isOpen }) => (isOpen ? 'fadeIn 0.2s ease-in-out' : 'none')};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const ModalContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  background-color: ${colors.grey100};
  border-radius: 12px;
  padding: 20px 0;
  width: 80vw;
  height: 80vh;
  min-width: 400px;
  min-height: 400px;
  max-width: 1200px;
  max-height: 800px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: ${({ isOpen }) => (isOpen ? 'slideUp 0.2s ease-in-out' : 'none')};

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const ModalTitle = styled(Text)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s;
  margin-left: auto;

  &:hover {
    opacity: 1;
  }
`

const ModalContent = styled.div`
  overflow-y: auto;
  flex: 1;
  min-height: 0;
`

export function Modal({ isOpen, onClose, title = '', children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <Overlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer
        isOpen={isOpen}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Flex justifyContent="space-between" alignItems="center" css={{ position: 'relative', padding: '20px 24px' }}>
          <ModalTitle fontSize={18} fontWeight="bold" color={colors.grey900}>
            {title}
          </ModalTitle>
          <CloseButton onClick={onClose} aria-label="닫기">
            <Image src={cancelIcon} alt="닫기" width={24} height={24} />
          </CloseButton>
        </Flex>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Overlay>,
    document.body,
  )
}
