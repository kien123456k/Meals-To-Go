import React, { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { ActivityIndicator, Colors } from "react-native-paper";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Search } from "../components/search.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { RestaurantList } from "../components/restaurant-list.styles";
import { FadeInView } from "../../../components/animations/fade.animation";
import { LocationContext } from "../../../services/location/location.context";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Welcome = styled(Text)`
  height: 100%;
  width: 100%;
  text-align: center;
  margin-top: 60%;
  font-size: ${(props) => props.theme.fontSizes.title};
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { error: locationError, keyword } = useContext(LocationContext);
  const { isLoading, restaurants, error } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  const hasError = !!error || !!locationError;

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )}
      {!keyword && !restaurants.length && (
        <Welcome>Please enter the city name</Welcome>
      )}
      {!hasError && (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant: item,
                  })
                }
              >
                <Spacer position="bottom" size="large">
                  <FadeInView>
                    <RestaurantInfoCard restaurant={item} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeArea>
  );
};
