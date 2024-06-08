import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { useState, useEffect } from "react";
import { getAllPosts, getLatestPosts } from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppWrite";
import VedioCard from "../../components/VedioCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(getAllPosts);
  const { data: latestPosts } = useAppWrite(getLatestPosts);

  const [refreshing, setrefreshing] = useState(false);
  const onRefresh = async () => {
    setrefreshing(true);
    // re call vedios (if any new changes appears)
    await refetch();
    setrefreshing(true);
  };


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VedioCard vedio={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back , 
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMethod="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Vedios
              </Text>

              <Trending
                posts={latestPosts ?? []}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No vedios found"
            subtitle="Be the first one to upload a vedio"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          ></RefreshControl>
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
