import { useNavigate } from 'react-router-dom'
import ChatBotScreen from '../components/chatbot/ChatBotScreen'

export default function ChatbotPage() {
  const navigate = useNavigate()

  return (
    <ChatBotScreen onClose={() => navigate(-1)} />
  )
}
