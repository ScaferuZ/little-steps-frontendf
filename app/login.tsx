import { StyleSheet, TextInput, View, Text } from 'react-native'
import { useSession } from './ctx'
import { router } from 'expo-router'
import styled from 'styled-components/native'
import ScreenLayout from 'src/components/ScreenLayout'
import Input from 'src/components/Input'
import { AntDesign } from '@expo/vector-icons'

import LinkButton from 'src/components/LinkButton'
import Button from 'src/components/Button'

export default function Login() {
  const { signIn } = useSession()
  const handleLogin = () => {
    signIn()
    router.replace('/')
  }

  return (
    <ScreenLayout>
      <S.Content>
        <S.Title>Selamat Datang 👋🏻</S.Title>
        <S.Text>Masuk dengan akun yang telah terdaftar!</S.Text>
        <View style={styles.separator} />
        <Input className="mb-6" label="Email" />
        <Input label="Kata Sandi" secureTextEntry={true} />
        <LinkButton
          className="text-xs mt-3 text-right w-full"
          href="/register"
          text="Lupa Kata Sandi?"
        />
        <Button className="w-full mt-11 p-4" variant="primary" onPress={handleLogin}>
          Masuk
        </Button>
        <View className="flex flex-row items-center mt-24">
          <View className="flex-1 h-[1px] bg-grey" />
          <View>
            <Text className="px-4 text-center text-sm text-grey">atau daftar dengan</Text>
          </View>
          <View className="flex-1 h-[1px] bg-grey" />
        </View>
        <Button className="w-full mt-9 p-4 font-semibold drop-shadow-2xl" variant="google">
          <View className="flex flex-row items-center justify-center space-x-4">
            <AntDesign name="google" size={16} />
            <Text className="ml-4 font-bold">Google</Text>
          </View>
        </Button>
        <View className="flex flex-row w-full justify-center items-center mt-11">
          <Text className="text-center text-sm text-grey">Belum memiliki akun? </Text>
          <LinkButton
            href="/signup"
            className="text-center text-sm font-bold text-primary ml-1"
            text="Daftar"
          />
        </View>
      </S.Content>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold'
  },
  paragraph: {
    fontSize: 14
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 10,
    borderRadius: 4
  }
})

const S = {
  Content: styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    margin: ${(p) => p.theme.size(30, 'px')};
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.black};
    font-family: helvetica;
    font-weight: 900;
    font-size: ${(p) => p.theme.size(24, 'px')};
    margin-bottom: ${(p) => p.theme.size(3, 'px')};
  `,
  Text: styled.Text`
    color: ${(p) => p.theme.black};
    opacity: 0.5;
    font-family: helvetica;
    font-size: ${(p) => p.theme.size(14, 'px')};
  `
}
