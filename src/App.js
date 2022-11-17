import Main from 'containers/Main';
import { WalletProvider } from './WalletContext'

import 'assets/select.scss'

function App() {

  return (
    <WalletProvider>
      <Main/>
    </WalletProvider>
  )
}

export default App;
