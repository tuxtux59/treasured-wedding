import React, { useEffect, useState } from 'react';
import { Chrono } from 'react-chrono';
import { TimelineItemModel } from 'react-chrono/dist/models/TimelineItemModel';
import { WeddingFile } from '../utils/types';
import moment from 'moment';

type Props = {
  filteredFiles: WeddingFile[];
};

const Sidebar = ({ filteredFiles }: Props) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItemModel[]>([]);

  useEffect(() => {
    if (filteredFiles.length === 0) {
      setTimelineItems([]);
      return;
    }

    const groupedItems = filteredFiles.reduce(
      (acc: { [date: string]: number }, current) => {
        const hour = moment(current.client_modified).format('HH');
        const day = moment(current.client_modified).format('DD');
        console.debug('day', day);
        const date = `${day}/10 - ${hour}h`;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {}
    );

    const groupedTimelineItems = Object.entries(groupedItems).map(([k, v]) => {
      const [date, hour] = k.split(' - ');
      const desc = `${v} fichier(s)`;
      return {
        id: k,
        title: date,
        cardTitle: hour,
        url: '#',
        cardSubtitle: date,
        cardDetailedText: desc,
      } as TimelineItemModel;
    });

    setTimelineItems(groupedTimelineItems);
  }, [filteredFiles]);

  return (
    <div id="right-section" className="flex-grow h-full flex">
      {/* Scrollable Timeline */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-full p-2 w-full items-center justify-center flex">
          <div className="w-full h-full p-4 bg-gray-50 rounded-lg shadow-lg flex items-center justify-center">
            {timelineItems.length > 0 && (
              <Chrono
                items={timelineItems}
                className="py-4 my-4"
                mode="VERTICAL"
                scrollable
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
