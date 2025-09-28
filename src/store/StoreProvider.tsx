import { store } from './store.ts'
import { Provider } from 'react-redux'

interface Props {
    children: React.ReactNode
}

export const StoreProvider = ({ children }: Props) => {
    return (
        <Provider store={store}>
            {children}</Provider>
    )
}
