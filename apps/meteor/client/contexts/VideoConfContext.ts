import { IRoom } from '@rocket.chat/core-typings';
import { createContext, useContext } from 'react';
import { Subscription, useSubscription } from 'use-subscription';

import { DirectCallParams } from '../lib/VideoConfManager';

export type VideoConfPopupPayload = {
	id: string;
	rid: IRoom['_id'];
	isReceiving?: boolean;
};

export type VideoConfIncomingCall = {
	callId: string;
	uid: string;
	rid: string;
};

type VideoConfContextValue = {
	dispatchOutgoing: (options: Omit<VideoConfPopupPayload, 'id'>) => void;
	startCall: (rid: IRoom['_id'], title?: string) => void;
	acceptCall: (callId: string) => void;
	joinCall: (callId: string) => void;
	dismissCall: (callId: string) => void;
	rejectIncomingCall: (callId: string) => void;
	abortCall: () => void;
	setPreferences: (prefs: { mic?: boolean; cam?: boolean }) => void;
	changePreference: (key: 'cam' | 'mic', value: boolean) => void;
	queryIncomingCalls: Subscription<DirectCallParams[]>;
	queryRinging: Subscription<boolean>;
	queryCalling: Subscription<boolean>;
};

export const VideoConfContext = createContext<VideoConfContextValue | undefined>(undefined);
const useVideoConfContext = (): VideoConfContextValue => {
	const context = useContext(VideoConfContext);
	if (!context) {
		throw new Error('Must be running in VideoConf Context');
	}

	return context;
};

export const useVideoConfDispatchOutgoing = (): VideoConfContextValue['dispatchOutgoing'] => useVideoConfContext().dispatchOutgoing;
export const useVideoConfStartCall = (): VideoConfContextValue['startCall'] => useVideoConfContext().startCall;
export const useVideoConfAcceptCall = (): VideoConfContextValue['acceptCall'] => useVideoConfContext().acceptCall;
export const useVideoConfJoinCall = (): VideoConfContextValue['joinCall'] => useVideoConfContext().joinCall;
export const useVideoConfDismissCall = (): VideoConfContextValue['dismissCall'] => useVideoConfContext().dismissCall;
export const useVideoConfAbortCall = (): VideoConfContextValue['abortCall'] => useVideoConfContext().abortCall;
export const useVideoConfRejectIncomingCall = (): VideoConfContextValue['rejectIncomingCall'] => useVideoConfContext().rejectIncomingCall;
export const useVideoConfIncomingCalls = (): DirectCallParams[] => {
	const { queryIncomingCalls } = useVideoConfContext();
	return useSubscription(queryIncomingCalls);
};
export const useVideoConfSetPreferences = (): VideoConfContextValue['setPreferences'] => useVideoConfContext().setPreferences;
export const useVideoConfChangePreference = (): VideoConfContextValue['changePreference'] => useVideoConfContext().changePreference;
export const useVideoConfIsRinging = (): boolean => {
	const { queryRinging } = useVideoConfContext();
	return useSubscription(queryRinging);
};
export const useVideoConfIsCalling = (): boolean => {
	const { queryCalling } = useVideoConfContext();
	return useSubscription(queryCalling);
};