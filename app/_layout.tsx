import { Slot } from 'expo-router';
import { SessionProvider } from '../providers/ctx';
import { SearchProvider } from '../providers/searchContext';
export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <SearchProvider>
        <Slot />
      </SearchProvider>  
    </SessionProvider>
  );
}
