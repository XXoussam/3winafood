import { useState,useEffect } from "react";

const useAppWrite = (fn) => {
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fn();
      setdata(response);
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    fetchData();
  }

  return {data,isLoading,refetch}
};

export default useAppWrite;
