import {
    Image,
    ScrollView,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tailwind from 'tailwind-rn';
import {withTheme} from 'react-native-paper';
import axios from 'axios';
import WishListButton from '../shared/WishListButton';

function MovieDetailsScreen(props) {
    const {item} = props.route.params;
    const {primary, flashyGreen} = props.theme.colors;
    const [isLoading, setIsLoading] = useState(true);
    const [director, setDirector] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=318dc2bc4628a09c26291d2dbd0ca6b2&append_to_response=credits`);
            if (res.data) {
                const directorData = res.data.credits.crew.filter(item => item.job === 'Director');
                setDirector(directorData[0]);
                setIsLoading(false);
            } else {
                console.log('pas de data');
            }
        };
        fetchData();
    }, [setDirector]);

    return (
        <>
            {!isLoading ?
                <>
                    <ScrollView>
                        <View style={tailwind('flex-1')}>
                            <Image style={{resizeMode: 'contain', width: '100%', height: 200}}
                                   source={{uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`}}/>
                            <View style={[{backgroundColor: '#000000c0'},tailwind('w-full absolute bottom-0 flex-1 flex-row')]}>
                                <Text style={[{
                                    color: primary,
                                    fontWeight: 'bold',
                                }, tailwind('w-10/12 text-2xl leading-10 ml-5 text-center')]}>{item.title}
                                </Text>
                                <View style={tailwind('mb-1 pr-5 items-end self-center')}>
                                    <WishListButton movieItem={item} />
                                </View>
                            </View>
                        </View>
                        <View style={tailwind('flex-1 px-5 mb-5')}>
                            <Text style={[{
                                color: primary,
                                width: 150,
                                borderColor: flashyGreen,
                                fontWeight: 'bold',
                            }, tailwind('text-lg pt-2 border-b-2')]}>Réalisateur</Text>
                            <Text style={[{color: primary}, tailwind('pt-2')]}>{director.name}</Text>
                            <Text style={[{
                                color: primary,
                                width: 150,
                                borderColor: flashyGreen,
                                fontWeight: 'bold',
                            }, tailwind('text-lg pt-2 border-b-2')]}>Synopsis</Text>
                            <Text style={[{color: primary}, tailwind('pt-2')]}>{item.overview}</Text>
                        </View>
                    </ScrollView></> :
                <View style={tailwind('flex-1 justify-center')}>
                    <ActivityIndicator size="large" color={flashyGreen}/>
                </View>}
        </>
    );
}

export default withTheme(MovieDetailsScreen);
