import { AssistantPackage, RuleDefinition } from '@sketch-hq/sketch-assistant-types'

const duplicateSymbols: RuleDefinition = {
  rule: async (context) => {
    interface Duplicate {
      name: string
      number: number
      local: boolean
      foreign: boolean
    }

    var duplicates: Array<Duplicate> = [];
    var totalDuplicates = 0;
    var localDuplicates = 0;
    var mixedDuplicates = 0;
    var foreignDuplicates = 0;

    for (const symbol of context.utils.objects.symbolMaster) {
      var existingElement = duplicates.find((element) => element.name == symbol.name);
      if (existingElement != null)
        existingElement.number++;
      else
        duplicates.push({ name: symbol.name, number: 1, local: true, foreign: false });
    }

    for (const symbol of context.utils.foreignObjects.symbolMaster) {
      var existingElement = duplicates.find((element) => element.name == symbol.name)
      if (existingElement != null) {
        existingElement.number++;
        existingElement.foreign = true;
      }
      else {
        duplicates.push({ name: symbol.name, number: 1, local: false, foreign: true })
      }
    }

    totalDuplicates = (duplicates.filter((element) => element.number > 1)).length;
    localDuplicates = (duplicates.filter((element) => element.local && !element.foreign && element.number > 1)).length;
    mixedDuplicates = (duplicates.filter((element) => element.local && element.foreign && element.number > 1)).length;
    foreignDuplicates = (duplicates.filter((element) => !element.local && element.foreign && element.number > 1)).length;

    if (totalDuplicates > 0) context.utils.report('There ' + (totalDuplicates > 1 ? 'are ' : 'is ') + totalDuplicates + ' duplicate symbol' + (totalDuplicates > 1 ? 's' : '') + ' in your design.');
    if (localDuplicates > 0) context.utils.report('💎 There ' + (localDuplicates > 1 ? 'are ' : 'is ') + localDuplicates + ' duplicate symbol' + (localDuplicates > 1 ? 's' : '') + ' in this file.');
    if (mixedDuplicates > 0) context.utils.report('💎🔶 There ' + (mixedDuplicates > 1 ? 'are ' : 'is ') + mixedDuplicates + ' symbol' + (mixedDuplicates > 1 ? 's' : '') + ' that exist in your file and in external libraries related to this file.');
    if (foreignDuplicates > 0) context.utils.report('🔶 There ' + (foreignDuplicates > 1 ? 'are ' : 'is ') + foreignDuplicates + ' duplicate symbol' + (foreignDuplicates > 1 ? 's' : '') + ' in external libraries related to this file.');

  },
  name: 'duplicates-assistant/duplicate-symbols',
  title: '1. Duplicate symbols',
  description: 'Reports duplicate symbols in your design file.',
}

const duplicateLayerStyles: RuleDefinition = {
  rule: async (context) => {
    interface Duplicate {
      name: string
      number: number
      local: boolean
      foreign: boolean
    }

    var duplicates: Array<Duplicate> = [];
    var totalDuplicates = 0;
    var localDuplicates = 0;
    var mixedDuplicates = 0;
    var foreignDuplicates = 0;

    for (const style of context.utils.objects.sharedStyle) {
      if (style.value.textStyle == undefined) {
        var existingElement = duplicates.find((element) => element.name == style.name)
        if (existingElement != null)
          existingElement.number++;
        else {
          duplicates.push({ name: style.name, number: 1, local: true, foreign: false });
        }
      }
    }

    for (const style of context.utils.foreignObjects.sharedStyle) {
      if (style.value.textStyle == undefined) {
        var existingElement = duplicates.find((element) => element.name == style.name)
        if (existingElement != null) {
          existingElement.number++;
          existingElement.foreign = true;
        }
        else {
          duplicates.push({ name: style.name, number: 1, local: false, foreign: true })
        }
      }
    }

    totalDuplicates = (duplicates.filter((element) => element.number > 1)).length;
    localDuplicates = (duplicates.filter((element) => element.local && !element.foreign && element.number > 1)).length;
    mixedDuplicates = (duplicates.filter((element) => element.local && element.foreign && element.number > 1)).length;
    foreignDuplicates = (duplicates.filter((element) => !element.local && element.foreign && element.number > 1)).length;

    if (totalDuplicates > 0) context.utils.report('There ' + (totalDuplicates > 1 ? 'are ' : 'is ') + totalDuplicates + ' duplicate symbol' + (totalDuplicates > 1 ? 's' : '') + ' in your design.');
    if (localDuplicates > 0) context.utils.report('💎 There ' + (localDuplicates > 1 ? 'are ' : 'is ') + localDuplicates + ' duplicate layer style' + (localDuplicates > 1 ? 's' : '') + ' in this file.');
    if (mixedDuplicates > 0) context.utils.report('💎🔶 There ' + (mixedDuplicates > 1 ? 'are ' : 'is ') + mixedDuplicates + ' layer style' + (mixedDuplicates > 1 ? 's' : '') + ' that exist in your file and in external libraries related to this file.');
    if (foreignDuplicates > 0) context.utils.report('🔶 There ' + (foreignDuplicates > 1 ? 'are ' : 'is ') + foreignDuplicates + ' duplicate layer style' + (foreignDuplicates > 1 ? 's' : '') + ' in external libraries related to this file.');

  },
  name: 'duplicates-assistant/duplicate-layer-styles',
  title: '2. Duplicate layer styles',
  description: 'Reports duplicate layer styles in your design file and linked libraries.',
}

const duplicateTextStyles: RuleDefinition = {
  rule: async (context) => {
    interface Duplicate {
      name: string
      number: number
      local: boolean
      foreign: boolean
    }

    var duplicates: Array<Duplicate> = [];
    var totalDuplicates = 0;
    var localDuplicates = 0;
    var mixedDuplicates = 0;
    var foreignDuplicates = 0;

    for (const style of context.utils.objects.sharedStyle) {
      if (style.value.textStyle != undefined) {
        var existingElement = duplicates.find((element) => element.name == style.name)
        if (existingElement != null)
          existingElement.number++;
        else {
          duplicates.push({ name: style.name, number: 1, local: true, foreign: false });
        }
      }
    }

    for (const style of context.utils.foreignObjects.sharedStyle) {
      if (style.value.textStyle != undefined) {
        var existingElement = duplicates.find((element) => element.name == style.name)
        if (existingElement != null) {
          existingElement.number++;
          existingElement.foreign = true;
        }
        else {
          duplicates.push({ name: style.name, number: 1, local: false, foreign: true })
        }
      }
    }

    totalDuplicates = (duplicates.filter((element) => element.number > 1)).length;
    localDuplicates = (duplicates.filter((element) => element.local && !element.foreign && element.number > 1)).length;
    mixedDuplicates = (duplicates.filter((element) => element.local && element.foreign && element.number > 1)).length;
    foreignDuplicates = (duplicates.filter((element) => !element.local && element.foreign && element.number > 1)).length;

    if (totalDuplicates > 0) context.utils.report('There ' + (totalDuplicates > 1 ? 'are ' : 'is ') + totalDuplicates + ' duplicate symbol' + (totalDuplicates > 1 ? 's' : '') + ' in your design.');
    if (localDuplicates > 0) context.utils.report('💎 There ' + (localDuplicates > 1 ? 'are ' : 'is ') + localDuplicates + ' duplicate text style' + (localDuplicates > 1 ? 's' : '') + ' in this file.');
    if (mixedDuplicates > 0) context.utils.report('💎🔶 There ' + (mixedDuplicates > 1 ? 'are ' : 'is ') + mixedDuplicates + ' text style' + (mixedDuplicates > 1 ? 's' : '') + ' that exist in your file and in external libraries related to this file.');
    if (foreignDuplicates > 0) context.utils.report('🔶 There ' + (foreignDuplicates > 1 ? 'are ' : 'is ') + foreignDuplicates + ' duplicate text style' + (foreignDuplicates > 1 ? 's' : '') + ' in external libraries related to this file.');

  },
  name: 'duplicates-assistant/duplicate-text-styles',
  title: '3. Duplicate text styles',
  description: 'Reports duplicate text styles in your design file and linked libraries.',
}

const assistant: AssistantPackage = async () => {
  return {
    name: 'duplicates-assistant',
    rules: [duplicateSymbols, duplicateLayerStyles, duplicateTextStyles],
    config: {
      rules: {
        'duplicates-assistant/duplicate-symbols': { active: true },
        'duplicates-assistant/duplicate-layer-styles': { active: true },
        'duplicates-assistant/duplicate-text-styles': { active: true }
      },
    },
  }
}

export default assistant
