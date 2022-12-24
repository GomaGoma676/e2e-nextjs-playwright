import '../styles/globals.css'
import Provider from './provider'
import NavBar from './components/nav-bar'
import MonitorSession from './components/monitor-session'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Provider>
          <MonitorSession />
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
