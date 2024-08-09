import { StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'
import ScreenLayout from 'src/components/ScreenLayout'
import './global.css'
import LoginForms from 'src/components/forms/LoginForms/LoginForms'

export default function Login() {
  return (
    <ScreenLayout>
      <S.Content>
        <S.Title>Selamat Datang 👋🏻</S.Title>
        <S.Text>Masuk dengan akun yang telah terdaftar!</S.Text>
        <View style={styles.separator} />
        <LoginForms />
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
