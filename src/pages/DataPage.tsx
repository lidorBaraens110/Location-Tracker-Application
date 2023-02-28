import {useEffect, useState} from 'react';
import {Text, View} from 'react-native-animatable';
import {Button, StyleSheet} from 'react-native';
import {ILocationData} from '../interface';
import {checkAndroidPlatform} from '../services/deviceService';
import {muclearFile, mureadFile} from '../services/fileService';
import { Provider as PaperProvider,DataTable,TouchableRipple,Portal, Modal} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const DataPage = (): JSX.Element => {
  const PAGE_SIZE = 10;

  const [locationData, setLocationData] = useState<ILocationData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ILocationData|null>();

  useEffect(() => {
    getNewData();
  }, []);


  const hideModal = () => {
    setShowModal(false);
    setModalData(null);

  };

  const getNewData=async()=>{
    console.log(Math.ceil(locationData.length / PAGE_SIZE))
    const data = await mureadFile();
      console.log(data);
      setLocationData(data);
  }

  const seeFullDescOfRow=(data:ILocationData)=>{
    setModalData(data);
    setShowModal(true);
  }

  return (
    <PaperProvider>
    <View>
      <Button onPress={muclearFile} title="clearFile" />
      <Button onPress={checkAndroidPlatform} title="checkAndroidPlatform" />
<Button onPress={getNewData} title='refres data'/>
<ScrollView>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Lan</DataTable.Title>
          <DataTable.Title>Lon</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>isLocked</DataTable.Title>
        </DataTable.Header>
        {locationData
          .map((val, index) => {
            return (
            <TouchableRipple key={index} onPress={() => seeFullDescOfRow(val)}>
              <DataTable.Row >
                <DataTable.Cell>
                  {parseFloat(
                      val.currentLocation.latitude.toFixed(2),
                      ).toString()}
                </DataTable.Cell>
                <DataTable.Cell>
                  {parseFloat(
                    val.currentLocation.longitude.toFixed(2),
                    ).toString()}
                </DataTable.Cell>
                <DataTable.Cell>{val.date}</DataTable.Cell>
                <DataTable.Cell>
                  {val.isLocked ? 'true' : 'false'}
                </DataTable.Cell>
              </DataTable.Row>
                    </TouchableRipple>
            );
          })}
   
   </DataTable>
      
</ScrollView>

<Portal>
        <Modal visible={showModal} onDismiss={hideModal}>
        <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>data of this row:</Text>
          <Text>latitude: {modalData?.currentLocation.latitude}</Text>
          <Text>longitude: {modalData?.currentLocation.longitude}</Text>
          <Text>Date: {modalData?.date}</Text>
          <Text>isLocked: {modalData?.isLocked?'true':'false'}</Text>
        </View>
        </Modal>
        
      </Portal>
    </View>
    </PaperProvider>

  );
};


const styles=StyleSheet.create({
    modalContainer:{
        backgroundColor: '#fff',
        padding: 16,
    },
    modalTitle:{
        fontSize:20,
        marginBottom:5
    }

})

export default DataPage;
// +(locationData.length / 12).toFixed()