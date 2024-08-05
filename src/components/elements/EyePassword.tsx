import { FC } from 'react'
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Feather from '@expo/vector-icons/Feather'
import Button from 'src/components/Button'

interface EyePasswordProps {
  isHide: boolean
  name: string
  handleHidingEye: (name: string) => void
}

const EyePassword: FC<EyePasswordProps> = ({ isHide, name, handleHidingEye }) => {
  return (
    <Button variant="text" onPress={() => handleHidingEye(name)}>
      {isHide ? (
        <Feather name="eye-off" size={20} color="black" />
      ) : (
        <Feather name="eye" size={20} color="#64748B" />
      )}
    </Button>
  )
}

export default EyePassword
