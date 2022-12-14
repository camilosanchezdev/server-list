import { render as rtlRender, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Provider } from 'react-redux'
import Home from '../../pages/Home'
import store from '../../state/store';

const render = (component: any) => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

describe('<Home />', () => {
    test('The button should be enabled', () => {
        render(<Home />)

        const username = screen.getByPlaceholderText(/username/i)
        user.clear(username)
        user.type(username, 'tesonet')

        const password = screen.getByPlaceholderText(/password/i)
        user.clear(password)
        user.type(password, 'partyanimal')

        const btn = screen.getByRole('button', {
            name: /login/i
        })

        expect(btn).toBeEnabled()
    })
    test('The button should be disabled', () => {
        render(<Home />)
        const username = screen.getByPlaceholderText(/Username/i)
        user.type(username, 'tesonet')

        const password = screen.getByPlaceholderText(/Password/i)
        user.clear(password)

        const btn = screen.getByRole('button', {
            name: /login/i
        })

        expect(btn).toBeDisabled()
    })
})