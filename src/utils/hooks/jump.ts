import { useNavigate } from 'react-router-dom'

export default function jump() {
  const navigate = useNavigate()

  const toExcitingComments = (id: number | string, type: number) => {
    navigate(`/excitingComments/${id}/${type}`)
  }

  return [toExcitingComments]
}
