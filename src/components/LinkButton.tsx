import styled from 'styled-components/native'
import { Link } from 'expo-router'
import { openURL } from 'expo-linking'

interface Props {
  href: string
  text: string
  className?: string
}

export default function LinkButton({ href, text, className }: Props) {
  return href.substring(0, 1) === '/' ? (
    <S.InternalLink className={`${className}`} testID="link-button" href={href}>
      <S.LinkText className="text-primary " testID="link-button-text">
        {text}
      </S.LinkText>
    </S.InternalLink>
  ) : (
    <S.ExternalLink className={`${className}`} testID="link-button" onPress={() => openURL(href)}>
      <S.LinkText testID="link-button-text">{text}</S.LinkText>
    </S.ExternalLink>
  )
}

const S = {
  ExternalLink: styled.TouchableOpacity`
    border-color: ${(p) => p.theme.primary};
    border-width: ${(p) => p.theme.size(0, 'px')};
    border-radius: ${(p) => p.theme.size(5, 'px')};
    background-color: transparent;
  `,
  InternalLink: styled(Link)`
    border-color: ${(p) => p.theme.primary};
    border-width: ${(p) => p.theme.size(0, 'px')};
    border-radius: ${(p) => p.theme.size(5, 'px')};
    background-color: transparent;
  `,
  LinkText: styled.Text``
}
