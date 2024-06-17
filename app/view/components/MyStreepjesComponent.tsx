import {
  View,
  StyleSheet,
  Animated,
  RefreshControl,
  Pressable,
} from "react-native";
import { Category, FullStreepje, Streepje } from "../../config/types";
import {
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  Popover,
  Text,
} from "@ui-kitten/components";
import { useCallback, useEffect, useState } from "react";
import streepService from "../../services/streepService";
import FlatList = Animated.FlatList;

interface MyStreepjesProps {
  userId: number;
}

export const MyStreepjes = ({ userId }: MyStreepjesProps) => {
  if (userId === 0) {
    return <Text>Loading...</Text>;
  }

  const [streepjes, setStreepjes] = useState<FullStreepje[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchStreepjes(userId);
    setRefreshing(false);
  }, [userId, refreshing]);

  async function fetchStreepjes(userId: number) {
    const streepjes = await streepService.getStreepjes(userId, true);
    setStreepjes(streepjes);
  }
  async function refresh() {
    setRefreshing(true);
  }
  return <StreepjesList streepjes={streepjes} refresh={refresh} />;
};

interface StreepjesViewProps {
  streepjes: FullStreepje[];
  refresh: () => Promise<void>;
}

interface IListItem {
  id: number;
  category: string;
  reason: string;
  date: Date;
}

function toListItem(streepje: FullStreepje): IListItem {
  return {
    id: streepje.id,
    category: streepje.category.name,
    reason: streepje.reason,
    date: new Date(streepje.createdAt),
  };
}

const StreepjesList = (props: StreepjesViewProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    props.refresh().then(() => setRefreshing(false));
  }, []);
  async function deleteStreepje(id: number) {
    await streepService.removeStreepje(id);
    await props.refresh();
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: IListItem;
    index: number;
  }): React.ReactElement => (
    <ListItem
      accessoryRight={() => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Text>{item?.date.toLocaleDateString()}</Text>
          <DeleteButton onConfirm={() => deleteStreepje(item.id)} />
        </View>
      )}
      title={`${item.category}`}
      description={`${item.reason}`}
    />
  );
  return (
    <>
      <Text>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {props.streepjes.length}{" "}
        </Text>
        <Text style={{ fontSize: 24, fontWeight: "normal" }}>
          {props.streepjes.length === 1
            ? "streepje, niet goed bezig!"
            : props.streepjes.length > 1
              ? "streepjes, niet goed bezig!"
              : "streepjes, goed bezig!"}
        </Text>
      </Text>

      <List
        style={styles.container}
        data={props.streepjes.map(toListItem)}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        refreshing={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
};

interface DeleteButtonProps {
  onConfirm: () => any;
}

const DeleteButton = ({ onConfirm }: DeleteButtonProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <Popover
      visible={visible}
      onBackdropPress={() => setVisible(false)}
      anchor={() => (
        <Button
          status="danger"
          onPress={() => setVisible(true)}
          accessoryLeft={() => (
            <Icon
              style={styles.icon}
              name={"trash-2-outline"}
              fill="#fff"
            ></Icon>
          )}
        />
      )}
    >
      <View style={{ padding: 16 }}>
        <Text style={{ paddingBottom: 0 }}>Ben je zeker?</Text>
        <Button status={"danger"} onPress={onConfirm}>
          Ja
        </Button>
      </View>
    </Popover>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  icon: {
    width: 20,
    height: 20,
    color: "white",
  },
});
