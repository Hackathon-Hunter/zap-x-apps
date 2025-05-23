import { NumberText } from '@/components/NumberText';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import styles from './styles';

export default function UserDashboard() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" className="text-black dark:text-red-900">
        Welcome, Budi!
      </ThemedText>

      <ThemedView style={styles.balanceCard}>
        <ThemedText style={styles.balanceLabel}>Current Balance</ThemedText>
        <NumberText style={styles.income}>Rp 2,500.00</NumberText>
      </ThemedView>
    </ThemedView>
  );
}
