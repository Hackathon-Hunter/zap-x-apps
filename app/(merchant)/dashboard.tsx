import { NumberText } from '@/components/NumberText';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MerchantDashboard() {
  return (
    <ThemedView className="flex-1 p-5">
      <ThemedText className="text-xl font-semibold text-black dark:text-red-900">
        Welcome, Budi!
      </ThemedText>

      <ThemedView className="mt-6 p-5 rounded-3xl bg-gray-100">
        <ThemedText className="text-sm text-gray-600">Current Balance</ThemedText>
        <NumberText className="mt-2 text-3xl font-semibold text-green-600">Rp 2,500.00</NumberText>
      </ThemedView>
    </ThemedView>
  );
}
