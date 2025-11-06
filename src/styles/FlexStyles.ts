import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
  },
  flexContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 20,
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  redBox: { backgroundColor: 'red' },
  blueBox: { backgroundColor: 'blue' },
  greenBox: { backgroundColor: 'green' },
  controls: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  // Variants
  flexDirection_row_reverse: {flexDirection:'row-reverse'},
  justify_flex_start: { justifyContent: 'flex-start' },
  justify_center: { justifyContent: 'center' },
  justify_space_between: { justifyContent: 'space-between' },
  align_flex_start: { alignItems: 'flex-start' },
  align_center: { alignItems: 'center' },
  align_stretch: { alignItems: 'stretch' },
});
