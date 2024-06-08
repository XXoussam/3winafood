import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { useEffect } from "react";
import { getUserPosts, searchPosts, signOut } from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppWrite";
import VedioCard from "../../components/VedioCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import { Image } from "react-native-animatable";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setIsLogged(false);
    setUser(null);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VedioCard vedio={item} />}
        ListHeaderComponent={() => (
          <>
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>

              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-[90%] h-[90%] rounded-lg"
                  resizeMode="cover"
                />
              </View>

              <InfoBox
                title={user?.username}
                containerStyles="mt-5"
                titleStyles="text-lg"
              />
              <View className="mt-5 flex-row">
                <InfoBox
                  title={posts.length || 0}
                  containerStyles="mr-5"
                  titleStyles="text-xl"
                  subtitle="Posts"
                />

                <InfoBox
                  title="1.2k"
                  subtitle="Followers"
                  titleStyles="text-xl"
                />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
