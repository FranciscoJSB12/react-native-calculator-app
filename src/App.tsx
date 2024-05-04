import { View, StatusBar } from 'react-native';
import { CalculatorScreen } from './presentation/screens/CalculatorScreen';
import { styles } from './config/theme/app-theme';

const App = () => {
  return (
    <View style={styles.background}>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <CalculatorScreen />
    </View>
  );
};

export default App;
