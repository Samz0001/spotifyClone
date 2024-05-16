 import React, { useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet,View } from 'react-native';
 
import TrackPlayer, {
    Event,
    Track,
    useTrackPlayerEvents
} from 'react-native-track-player'
import { playListData } from '../constants';
import SongInfo from '../components/Songinfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';


 const {width} =Dimensions.get("window")
 const MusicPlayer = () => {
    const [track, setTrack] = useState<Track | null>(null);
  
    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
      if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack);
      }
    });
  
    const renderArtWork = ({ item }) => {
      return (
        <View style={styles.listArtWrapper}>
          <View style={styles.albumContainer}>
            {item.artwork && (
              <Image
                style={styles.albumArtImg}
                source={{ uri: item.artwork.toString() }}
              />
            )}
          </View>
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          data={playListData}
          renderItem={renderArtWork}
          keyExtractor={(song) => song.id.toString()}
        />
        <SongInfo track={track} />
        <SongSlider />
        <ControlCenter />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#001d23',
    },
    listArtWrapper: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    albumContainer: {
      width: 300,
      height: 300,
    },
    albumArtImg: {
      height: '100%',
      borderRadius: 4,
    },
  });
  
  export default MusicPlayer;