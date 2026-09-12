import { Navigation } from '@/components/navigation/Navigation';
import { Hero } from '@/components/hero/Hero';
import { Experience } from '@/lib/scroll/Experience';
import { Origin } from '@/components/origin/Origin';
import { Machine } from '@/components/machine/Machine';
import { DAS } from '@/components/das/DAS';
import { Aerodynamics } from '@/components/aerodynamics/Aerodynamics';
import { Power } from '@/components/power/Power';
import { Cockpit } from '@/components/cockpit/Cockpit';
import { Championship } from '@/components/season/Championship';
import { LaterChapters } from '@/components/ui/LaterChapters';
import { Legacy } from '@/components/legacy/Legacy';

export default function Home() {
  return <Experience><Navigation /><main><Hero /><Origin /><Machine /><DAS /><Aerodynamics /><Power /><Cockpit /><LaterChapters><Championship /><Legacy /></LaterChapters></main></Experience>;
}
