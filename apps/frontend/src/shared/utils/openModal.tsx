import { createRoot, Root } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Modal } from '@shared/style/components/Modal/Modal'
import { queryClient } from '@shared/config/queryClient'

type ModalConfig = {
  title?: string
  content: React.ReactNode
  onClose?: () => void
}

let modalRoot: Root | null = null
let currentModalContainer: HTMLDivElement | null = null

function initializeModalRoot() {
  if (!modalRoot || !currentModalContainer) {
    currentModalContainer = document.createElement('div')
    document.body.appendChild(currentModalContainer)
    modalRoot = createRoot(currentModalContainer)
  }
}

function cleanup() {
  if (currentModalContainer && modalRoot) {
    modalRoot.render(null)
  }
}

/**
 * 모달을 열고 닫는 함수
 * @param title - 모달 제목
 * @param content - 모달 내용
 * @param onClose - 모달 닫기 함수
 * @returns 모달 닫기 함수
 */
export function openModal({ title, content, onClose }: ModalConfig) {
  initializeModalRoot()

  const handleClose = () => {
    cleanup()
    onClose?.()
  }

  modalRoot!.render(
    <QueryClientProvider client={queryClient}>
      <Modal onClose={handleClose} title={title}>
        {content}
      </Modal>
    </QueryClientProvider>,
  )
}
