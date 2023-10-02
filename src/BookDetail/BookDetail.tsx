import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookDetailStyle from './BookDetailStyle';
import { FlatList, Image, Modal, Text } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { View } from 'react-native';
import { BookType, CommentsType, setBookRating } from '../store/slices/bookSlice';
import { createBookRating, getBookById, getBookComment, getBookRating } from '../api/book.api';
import { StackScreenProps } from '@react-navigation/stack';
import Header from '../Header/Header';
import { Rating } from '@kolking/react-native-rating';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../Footer/Footer';
import CatalogStyles from '../Catalog/CatalogStyle';
import Button from '../Button/Button';

type RootStackParamList = {
  BookDetail: { id: number }
};

type Props = StackScreenProps<RootStackParamList, 'BookDetail'>;

const BookDetail: React.FC<Props> = ({ route }) => {
  const isUser = useAppSelector(state => state.user.user);
  // const userNewRating = useAppSelector(state => state.book.ratingStore);

  // console.log(userNewRating)
  const [bookDetail, setBookDetail] = useState<BookType>();
  const [userRating, setUserRating] = useState();
  const [userNewRating, setUserNewRating] = useState();
  const [showModal, setShowModal] = useState(false)
  const [userComment, setUserComment] = useState<CommentsType>()

  const { id } = route.params;

  const fetchBookDetail = async () => {
    if (!id) { return; }
    try {
      const response = await getBookById(id);
      setBookDetail(response.data);
    } catch (er) {
      console.log(er);
    }
  }

  const addBookRating = async (rating: number) => {
    try {
      const responce = await createBookRating(id, rating)
      // setBookRating(responce.data.rating)
      setUserNewRating(responce.data.rating);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
    catch (er) {
      console.log(er);
    }
  };

  const fetchBookRating = async () => {
    try {
      const responce = await getBookRating(id)
      if (responce.data.rating) {
        setUserRating(responce.data.rating);
        console.log('!!!!!', responce.data)
      }
      else { setUserRating(0); }
    }
    catch (er) {
      console.log(er);
    }
  };
  
  const fetchBookComment = async () => {
    try {
      const responce = await getBookComment(id)
      console.log('responce!!!!', responce.data)
      if (responce.data.length) {
        setUserComment(responce.data)
      }
      else { setUserRating(0); }
    }
    catch (er) {
      console.log(er);
    }
  };
  
  

  const onCartClick = () => {
  };

  useEffect(() => {
    fetchBookComment();
  }, [])
  
  useEffect(() => {
    fetchBookDetail();
    fetchBookRating();
  }, [userNewRating, userRating])


  if (!bookDetail) { return null; }

  return (
    <ScrollView>
      <Header></Header>
      <View style={{ marginTop: 30, marginHorizontal: 15, }}>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <Image style={{ width: 135, minHeight: 202, borderRadius: 16 }} source={{ uri: bookDetail.image }} />

          <View style={{ flexDirection: 'column', gap: 20, }}>
            <Text style={{ color: '#0D1821', fontWeight: '700', fontSize: 18, maxWidth: 135 }}>
              {bookDetail.title}
            </Text>
            <Text style={{ color: '#0D1821', fontSize: 14 }}>
              {bookDetail.author}
            </Text>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Image style={{ width: 15, minHeight: 15 }} source={require('../../images/icons/star.png')} />
              <Text style={{ color: '#B9BAC3', fontSize: 14 }}>
                {(bookDetail.overall_rating).toFixed(1)}
              </Text>
            </View>
            {isUser && userRating !== 0 &&
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-end'}}>
                <Text>Your rate of this book: </Text>
                <Text style={{color: '#BFCC94', fontWeight: '700', fontSize: 18}}>{userRating}</Text>
              </View>
            }
            {isUser && userRating === 0 &&
              <View>
                <Rating maxRating={5} size={20} rating={userNewRating} fillColor={'#BFCC94'} onChange={addBookRating} />
                <Text style={{ color: '#B9BAC3', fontSize: 14, marginTop: 10 }}>Rate this book</Text>
              </View>
            }
            <Modal visible={showModal} transparent>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 40 }}>
                  <Text>Rating was successfully add!</Text>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <Text style={{fontSize: 14, color: '#0D1821', marginVertical: 20}}>Description</Text>
        <Text style={{fontSize: 12, color: '#344966', marginBottom: 20}}>{bookDetail.body}</Text>
        <Button style={CatalogStyles.price_button} text={`$${bookDetail.price} USD`} onPress={onCartClick} />
        <View style={{marginVertical: 30, flexDirection: 'row', gap: 15}}>
        {/* <View style={{flexDirection: 'row', gap: 15, backgroundColor: '#BFCC94'}}> */}
        <Image style={{ width: 35, minHeight: 35}} source={{ uri: userComment?.avatar_url }} />

        
        {/* </View> */}

        </View>
      </View>
      <Footer />
    </ScrollView>

  );
};

export default BookDetail;


