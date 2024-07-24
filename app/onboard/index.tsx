import React, { useRef, useState } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  ViewToken,
  Button
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { slides } from '../../src/components/Onboarding/slides'
import Paginator from 'src/components/Onboarding/Paginator'
import OnboardingItems from 'src/components/Onboarding/Items'
import NextButton from 'src/components/Onboarding/NextButton'

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef<any>(null)

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false
  })

  const handleSkipPress = () => {
    slidesRef.current.scrollToEnd()
  }

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
    }
  }

  return (
    <LinearGradient
      colors={[
        '#FFFFFF',
        '#FAFAFA',
        '#F6E5EB',
        '#F5E1E8',
        '#F4DCE4',
        '#F5E1E8',
        '#F6E5EB',
        '#FAFAFA',
        '#FFFFFF'
      ]}
      style={styles.background}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={slides}
            renderItem={({ item }) => <OnboardingItems item={item} />}
            horizontal
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={onScroll}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.paginator}>
          <Paginator data={slides} scrollX={scrollX} />
          {currentIndex < 2 && (
            <View style={styles.nextButton}>
              <TouchableOpacity onPress={handleSkipPress}>
                <Text style={styles.skip}>Lewati</Text>
              </TouchableOpacity>
              <NextButton
                scrollTo={scrollTo}
                percentage={(currentIndex + 1) * (100 / slides.length)}
              />
            </View>
          )}
          {currentIndex === 2 && (
            <TouchableOpacity style={styles.daftarButton}>Awok</TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  paginator: {
    position: 'absolute',
    bottom: 133,
    left: -283,
    right: 0,
    alignItems: 'center'
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 20,
    marginLeft: 543
  },
  daftarButton: {
    flexDirection: 'row',
    width: 500,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 283
  },
  skip: {
    fontSize: 16
  }
})
