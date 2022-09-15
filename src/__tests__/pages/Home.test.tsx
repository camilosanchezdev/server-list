import { render as rtlRender, screen, } from '@testing-library/react'
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
    const onSubmit = jest.fn()
    beforeEach(() => {
        onSubmit.mockClear()
        render(<Home />)
    })
    test('The button should be enabled ', () => {

        const username = screen.getByRole('textbox')
        user.type(username, 'tesonet')

        const password = screen.getByPlaceholderText(/password/i)
        user.type(password, 'partyanimal')

        const btn = screen.getByRole('button', {
            name: /login/i
        })

        expect(btn).toBeEnabled()
    })
    test('The button should be disabled ', () => {
        const username = screen.getByRole('textbox')
        user.type(username, 'tesonet')

        const btn = screen.getByRole('button', {
            name: /login/i
        })
        expect(btn).toBeDisabled()
    })
})