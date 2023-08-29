import { Text, View } from "react-native";
import { MyContext } from "../App";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";

const Card = () => {
  const { state, dispatch } = useContext(MyContext);
  const [isLoad, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${state.token.access_token}`);
    fetch(
      `http://80.78.241.76/api/v1/get_cashback_for_choose/${state.card_id}`,
      {
        method: "GET",
        headers,
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setLoad(false);
        dispatch({
          type: "SET_CARD",
          payload: json,
        });
      });
  }, [state.card_id]);

  return (
    <SafeAreaView>
      {isLoad ? <Text>Loading...</Text> : <Text>{state.card_id}</Text>}
    </SafeAreaView>
  );
};

export default Card;
