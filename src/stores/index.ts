// All Migrate

// import { AnyAction, combineReducers } from 'redux';
// import {
// 	persistStore,
// 	persistReducer,
// 	FLUSH,
// 	REHYDRATE,
// 	PAUSE,
// 	PERSIST,
// 	PURGE,
// 	REGISTER
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { configureStore } from '@reduxjs/toolkit';
import errorHandlerMiddleware from '@/middlewares/errorHandlerMiddleware';
import { userSlice } from './User';
import { articleSlice } from './Articles';
import { findDoctorSlice } from './FindDoctor';
import { bannerSlice } from './Banner';
import { facilityServicesSlice } from './FacilityServices';
import { centerOfExcellenceSlice } from './CenterOfExcellence';
import { eventClassesSlice } from './EventClasses';
import { awardsSlice } from './Awards';
import { hospitalSlice } from './Hospital';
import { patientProfileSlice } from './PatientProfile';
import { specialitiesSlice } from './Specialities';
import { contactUsSlice } from './ContactUs';
import { appointmentSlice } from './Appointment';
import { footerSlice } from './Footer';
import { medicalSpecialities } from './MedicalSpecialities';
import { notificationSlice } from './Notification';
import { rootSlice } from './Root';

const persistConfig = {
	key: 'root',
	// storage Migrate
};

// const reducers = combineReducers({
// 	[articleSlice.name]: articleSlice.reducer,
// 	[userSlice.name]: userSlice.reducer,
// 	[findDoctorSlice.name]: findDoctorSlice.reducer,
// 	[bannerSlice.name]: bannerSlice.reducer,
// 	[facilityServicesSlice.name]: facilityServicesSlice.reducer,
// 	[centerOfExcellenceSlice.name]: centerOfExcellenceSlice.reducer,
// 	[eventClassesSlice.name]: eventClassesSlice.reducer,
// 	[awardsSlice.name]: awardsSlice.reducer,
// 	[hospitalSlice.name]: hospitalSlice.reducer,
// 	[patientProfileSlice.name]: patientProfileSlice.reducer,
// 	[specialitiesSlice.name]: specialitiesSlice.reducer,
// 	[contactUsSlice.name]: contactUsSlice.reducer,
// 	[appointmentSlice.name]: appointmentSlice.reducer,
// 	[footerSlice.name]: footerSlice.reducer,
// 	[medicalSpecialities.name]: medicalSpecialities.reducer,
// 	[notificationSlice.name]: notificationSlice.reducer,
// 	[rootSlice.name]: rootSlice.reducer
// });

const middlewares = [
	errorHandlerMiddleware,
	// Put your custom middleware here
];

// const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
// 	reducer: persistedReducer,
// 	middleware: getDefaultMiddleware =>
// 		getDefaultMiddleware({
// 			serializableCheck: {
// 				ignoredActions: [
// 					FLUSH,
// 					REHYDRATE,
// 					PAUSE,
// 					PERSIST,
// 					PURGE,
// 					REGISTER
// 				]
// 			},
// 		}).concat(middlewares),
// 	// eslint-disable-next-line no-undef
// 	devTools: process.env.NODE_ENV !== 'production'
// });

// const persistor = persistStore(store);

// export type AppDispatch = typeof store.dispatch;

// export type RootState = ReturnType<typeof store.getState>;

// export { store, persistor };