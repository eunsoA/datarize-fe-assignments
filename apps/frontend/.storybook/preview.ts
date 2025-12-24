import type { Preview } from '@storybook/react'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { handlers } from '../src/mocks/handlers'

// MSW 초기화
initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: {
      handlers,
    },
  },
  decorators: [mswDecorator],
}

export default preview
