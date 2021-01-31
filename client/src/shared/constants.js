export const tableDateColumnSettings = (label, editable) => ({
  date: {
    id: 'date',
    label,
    editable,
    inputType: 'date',
    dateFormat: 'yyyy-MM-dd',
    minWidth: 200,
  },
});

export const tableAmountColumnSettings = (label, editable) => ({
  amount: {
    id: 'amount',
    label,
    editable,
    inputType: 'number',
    minWidth: 100,
  },
});

export const tableTypeColumnSettings = (
  label,
  selectType,
  editable,
  items,
) => ({
  type: {
    id: 'type',
    label,
    selectType,
    editable,
    inputType: 'select',
    minWidth: 170,
    items,
  },
});

export const tableCommentColumnSettings = (label, editable) => ({
  comment: {
    id: 'comment',
    label,
    editable,
    inputType: 'textArea',
    minWidth: 170,
    headerColSpan: 2,
  },
});

export const tableEditColumnSettings = () => ({
  edit: {
    id: 'edit',
    label: '',
    minWidth: 50,
  },
});
