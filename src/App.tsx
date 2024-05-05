import { View, StatusBar, Text } from 'react-native';
import { CalculatorScreen } from './presentation/screens/CalculatorScreen';
import { styles } from './config/theme/app-theme';

const App = () => {
  return (
    <View style={styles.background}>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <Text
        style={{ fontStyle: 'italic', paddingTop: 20, textAlign: 'center' }}>
        Calculadora desarrollada por{' '}
        <Text style={{ fontWeight: '700' }}>Francisco Javier Salazar</Text>
      </Text>
      <CalculatorScreen />
    </View>
  );
};

export default App;
