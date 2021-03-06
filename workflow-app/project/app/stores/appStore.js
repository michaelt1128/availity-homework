const createAppStore = () => ({
  isFlippable: false,
  loading: false,
  memberInfo: undefined,
  registered: false,
  setIsFlippable(value = false) {
    this.isFlippable = value;
  },
  setLoading(value) {
    this.loading = value;
  },
  setMemberInfo(value) {
    this.memberInfo = value;
  },
  toggleIsFlippable() {
    this.isFlippable = !this.isFlippable;
  },
  get memberName() {
    return this.memberInfo && this.memberInfo.name;
  },
  get hasMemberInfo() {
    return !!this.memberInfo;
  },
  setRegistered(value) {
    this.registered = value;
  }
});

export default createAppStore;
