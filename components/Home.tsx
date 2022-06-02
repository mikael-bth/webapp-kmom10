import { Image, Text, ScrollView } from 'react-native';
import train from './../assets/train.jpg';
import { Base, Typography } from './../styles';

export default function Home() {
  return (
      <ScrollView style={Base.base}>
        <Text style={[Typography.header1, {textAlign: "center", marginTop: 10}]}>Tåg information</Text>
        <Image source={train} style={Base.logo} />
        <Text style={[Typography.header2, {marginTop: 15}]}>Om appen</Text>
        <Text style={Typography.normal}>
          Välkommen till tåg information, med denna appen kan du få snabbt information om
          förseningar av tåg i hela Svergie. 
        </Text>
        <Text style={Typography.header2}>Senaste</Text>
        <Text style={Typography.normal}>
          Om du vill se dom senaste förseningarna kan du gå in på 'Senaste' i menyn här under
          och då kommer du kunna se dom senaste förseningar och hur långt tid dom tros vara.
        </Text>
        <Text style={Typography.header2}>Karta</Text>
        <Text style={Typography.normal}>
          Om du vill se en karta med information om förseningar kan du gå in på 'Karta' i menyn
          här under och då kommer du kunna vart det finns förseningar i hela landet och hur
          länge dom tros vara.
        </Text>
        <Text style={Typography.header2}>Favoriter</Text>
        <Text style={Typography.normal}>
          Om du väljer att skapa ett konto hos oss kan du till och med spara ner dina favorit
          stationer och kan då lätt gå och se vilka aktiva förseningar det finns på dom stationerna.
          Ifall du trycker på 'Logga in' i menyn så kan du logga in eller skapa ett konto och
          kan då börja se och skapa favoriter.
        </Text>
      </ScrollView>
  );
}

