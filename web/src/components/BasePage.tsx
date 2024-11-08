export default function BasePage({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-screen-lg mx-auto py-4 px-2">{children}</div>
}
