import { select } from 'redux-saga/effects'

import en from './locales/en'
import ar from './locales/ar'

const locales = {
	en: {
		name: 'English',
		data: en,
		abrev: 'en'
	},
	ar: {
		name: 'العربي',
		data: ar,
		abrev: 'ar'
	}
}

const getSettingOptions = () => {
	const optData = {}

	Object.keys(locales).forEach(v => {
		optData[v] = locales[v].name
	})

	return optData
}

const getKeyFromEnglishString = string => {
	const enDataList = [] 
	const enKeyList = Object.keys(locales.en.data)
	enKeyList.forEach(v => enDataList.push(locales.en.data[v]))

	return enKeyList[enDataList.indexOf(string)]
}

const getValueFromEnglishString = (enString, locale) => {
	if (!locale) return enString
	const key = getKeyFromEnglishString(enString)

	if (!key) return enString
	return locales[locale].data[key]
}

const getText = (key, locale) => {
	let text = locales[locale].data[key]
  
	if (!text) {
		text = locales[locale].data[getKeyFromEnglishString(key)] || key
	}

	return text
}

export function* translate (key) {
	const locale = yield select(state => state.app.locale)

	console.log('==> LOCALE: ', locale, getText(key, locale))

	return getText(key, locale)
}

export default { 
	locales, 
	getSettingOptions, 
	getText,
}